import * as vis from 'vis'
import { DiffGenerator, NodeDiff } from './diff_generator'

export class Graph {
  private options: vis.Options = {};
  public network: vis.Network;
  public minScale: number = null;
  public maxScale: number = null;
  public containerId = 'graphContainer'

  constructor (public diff: DiffGenerator) {
    const container = document.getElementById(this.containerId)
    const data = {
      nodes: this.nodes(),
      edges: this.edges()
    }

    this.options = {
      interaction: {
        selectConnectedEdges: true,
        keyboard: {
          bindToWindow: true
        },
        tooltipDelay: 500,
        navigationButtons: true
      },
      physics: {
        barnesHut: {
          centralGravity: 0.15
        },
        solver: 'barnesHut',
        timestep: 0.6
      },
      nodes: {
        shape: 'dot',
        scaling: {
          min: this.minScale,
          max: this.maxScale
        },
        font: {
          size: 12,
          face: 'Tahoma',
          color: 'white',
          strokeWidth: 1,
          strokeColor: '#101010'
        }
      },
      edges: {
        smooth: {
          enabled: true,
          type: 'dynamic',
          roundness: 0.5
        },
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        },
        color: { inherit: true },
        width: 0.15,
        shadow: {
          enabled: false,
          size: 10,
          x: 5,
          y: 5
        }
      },
      autoResize: true
    }

    this.resize()

    this.network = new vis.Network(container, data, this.options)
    this.network.on('doubleClick', (e) => {
      const nodeId = e.nodes[0]
      const node = this.diff.diffsMap[nodeId]
      if (node != null) {
        window['viewModel'].selectedNode(node)
      }
    })
    this.network.startSimulation()
    setTimeout(() => {
      this.network.stopSimulation()
    }, 5000)
  }

  resize () {
    var height = document.documentElement.clientHeight
    var editors = [this.containerId]
    editors.forEach(function (editor) {
      var containerDiv = document.getElementById(editor)
      var style = window.getComputedStyle(containerDiv)
      var hidden = style.display === 'none'
      if (!hidden) {
        containerDiv.style.height = (height - 200) + 'px;'
      }
    })
  }

  clear () {
    let container = document.getElementById(this.containerId)
    container.removeChild(container.firstChild)
  }

  nodes (): vis.Node[] {
    return this.diff.allNodes().map(diff => {
      if (this.minScale == null || diff.assertionsCount() < this.minScale) {
        this.minScale = diff.assertionsCount()
      }
      if (this.maxScale == null || diff.assertionsCount() > this.maxScale) {
        this.maxScale = diff.assertionsCount()
      }
      return {
        id: diff.id,
        label: diff.classLabel(),
        value: diff.assertionsCount(),
        title: (diff.nodeName || `${diff.idLabel()} (${diff.classLabel()})`),
        color: this.nodeColor(diff)
      }
    })
  }

  edges (): vis.Edge[] {
    let acc: vis.Edge[] = []

    this.diff.allNodes().forEach(diff => {
      (diff.linksRemoved || []).forEach(target => {
        acc.push({
          color: '#ff3860',
          from: diff.id,
          to: target
        })
      });
      (diff.linksAdded || []).forEach(target => {
        acc.push({
          color: '#23d160',
          from: diff.id,
          to: target
        })
      });
      (diff.linksNotChanged || []).forEach(target => {
        acc.push({
          color: '#9cdcfe',
          from: diff.id,
          to: target
        })
      })
    })

    return acc
  }

  private nodeColor (diff: NodeDiff): string {
    if (diff.assertionsAdded.length === 0 && diff.assertionsRemoved.length === 0) {
      return '#9cdcfe'
    } else if (diff.assertionsAdded.length > 0 && diff.assertionsNotChanged.length === 0) {
      return '#23d160'
    } else if (diff.assertionsRemoved.length > 0 && diff.assertionsNotChanged.length === 0) {
      return '#ff3860'
    } else {
      return '#ffdd57'
    }
  }
}
