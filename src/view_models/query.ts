import { Store } from 'rdfstore'
import * as ko from 'knockout'
import {
  HYDRA_NS, DOCUMENT_NS, HTTP_NS, SHAPES_NS, SHACL_NS, RDFS_NS, RDF_NS, XSD_NS,
  SCHEMA_ORG_NS
} from '../main/domain_model'
import { ViewModel } from '../view_model'
import { SelectResults } from 'rdfstore'
import { Bindings } from 'rdfstore'

export class PredefinedQuery {
  constructor (public name: string, public text: string) {}
}

export class Query {
    private store: Store;
    public text: KnockoutObservable<string> = ko.observable<string>('SELECT * { ?s ?p ?o }');
    public variables: KnockoutObservableArray<string> = ko.observableArray<string>([]);
    public results = [];
    public perPage: number = 10;
    public currentPage: KnockoutObservable<number> = ko.observable(-1);
    public bindings: KnockoutComputed<Bindings> = ko.computed(() => {
      var current = this.currentPage() * this.perPage
      return this.results.slice(current, current + this.perPage)
    });
    public totalPages: number = -1;
    public predefinedQueries: KnockoutObservableArray<PredefinedQuery> = ko.observableArray<PredefinedQuery>([
      new PredefinedQuery('All assertions ordered by subject', 'SELECT * { ?s ?p ?o } ORDER BY DESC(?s)'),
      new PredefinedQuery('All assertions ordered by predicate', 'SELECT * { ?s ?p ?o } ORDER BY DESC(?p)'),
      new PredefinedQuery('All properties in the graph',
        `SELECT DISTINCT ?property
 { ?s ?property ?o }
ORDER BY DESC(?property)`),
      new PredefinedQuery('Graph node types', 'SELECT ?type ?node { ?node rdf:type ?type } ORDER BY DESC(?type)'),
      new PredefinedQuery('All Documents in the Document Model',
        `SELECT * {
  ?resource rdf:type doc:Unit ;
            rdf:type ?type .
  FILTER (?type != doc:Unit)
} ORDER BY DESC(?type)`),
      new PredefinedQuery('Resources with methods defining successful responses',
        `SELECT ?path ?method ?status {

   ?resource rdf:type http:EndPoint ;
             http:path ?path ;
             hydra:supportedOperation ?operation .

   ?operation hydra:method ?method ;
              hydra:returns ?response .

   ?response hydra:statusCode ?status .
   FILTER (?status = "200"^^xsd:string) .

} ORDER BY DESC(?path)`),
      new PredefinedQuery('Encoded Domain elements',
        `SELECT * {

  ?document doc:encodes ?domainElement .
  ?domainElement rdf:type ?type .

  FILTER (?type != doc:DomainElement) .

} ORDER BY DESC(?domainElement)`)
    ]);
    public selectedPredefinedQuery: KnockoutObservable<PredefinedQuery|undefined> = ko.observable<PredefinedQuery|undefined>(undefined);

    constructor () {
      this.selectedPredefinedQuery.subscribe((value) => {
        if (value != null) {
          this.text(value.text)
        }
      })
    }

    process (jsonld: any, cb) {
      new Store((err, store: Store) => {
        if (err) {
          alert('Error creating RDF store')
        } else {
          this.store = store
          this.store.registerDefaultProfileNamespaces()
          this.store.registerDefaultNamespace('hydra', HYDRA_NS)
          this.store.registerDefaultNamespace('doc', DOCUMENT_NS)
          this.store.registerDefaultNamespace('http', HTTP_NS)
          this.store.registerDefaultNamespace('shapes', SHAPES_NS)
          this.store.registerDefaultNamespace('shacl', SHACL_NS)
          this.store.registerDefaultNamespace('rdf', RDF_NS)
          this.store.registerDefaultNamespace('rdfs', RDFS_NS)
          this.store.registerDefaultNamespace('xsd', XSD_NS)
          this.store.registerDefaultNamespace('schema-org', SCHEMA_ORG_NS)
          this.store.registerDefaultNamespace('meta', 'http://a.ml/vocabularies/meta#')
          this.store.registerDefaultNamespace('music', 'http://mulesoft.com/vocabularies/music#')
          this.store.registerDefaultNamespace('music-curation', 'http://mulesoft.com/vocabularies/music_curation#')

          store.load('application/ld+json', jsonld, (err) => {
            if (err) {
              cb(new Error(err), null)
            } else {
              cb(null, this)
            }
          })
        }
      })
    }

    submit () {
      if (this.store) {
        this.currentPage(-1)
        this.store.execute(this.text(), (err, res: SelectResults) => {
          if (err) {
            alert('Error executing query ' + this.text())
            console.log(err)
          } else {
            console.log(`Found ${res.length} results`)
            this.resetVariables(res[0])
            this.results = res
            this.totalPages = Math.floor(res.length / this.perPage)
            this.currentPage(0)
          }
        })
      }
    }

    nextPage () {
      if (this.currentPage() < this.totalPages) {
        this.currentPage(this.currentPage() + 1)
      }
    }

    previousPage () {
      if (this.currentPage() > 0) {
        this.currentPage(this.currentPage() - 1)
      }
    }

    private resetVariables (re: Bindings) {
      this.variables.removeAll()
      for (let p in re) {
        this.variables.push(p)
      }
    }
}
