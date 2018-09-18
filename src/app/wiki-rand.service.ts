import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WikiRandService {
    private randomPageURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&callback=JSONP_CALLBACK';
    private getPageURLByIdURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info&pageids=00000000&inprop=url&callback=JSONP_CALLBACK';

    constructor(
        private jsonp: Jsonp
    ) { }

    /** GET random wiki page **/
    getPage(): Observable<any> {
        return this.jsonp.request(this.randomPageURL)
            .pipe(
                map(page => {
                    this.log(`fetched wiki page`)
                    if (page['_body'] && page['_body'].query && page['_body'].query.pages) {
                        const pageId = Object.keys(page['_body'].query.pages)[0];
                        var data = page['_body'].query.pages[pageId];
                        return data
                    } else {
                        return 'No Data!'
                    }
                }),
                catchError(this.handleError('getPage', []))
            );
    }

    getURL(id): Observable<any> {
        var aaa = this.getPageURLByIdURL.replace('00000000', id);
        return this.jsonp.request(aaa)
            .pipe(
                map(page => {
                    var data = page['_body'].query.pages[id].fullurl;
                    return data;
                }),
                catchError(this.handleError('getPage', []))
            );
    }

    // in case we have a server, wikidata will be save there, not on a localStorage
    saveToLocalStorage(key, value): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    //

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead

            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log on a console **/
    private log(message: string) {
        console.log(message);
    }
}
