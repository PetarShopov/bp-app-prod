import { Component, OnInit } from '@angular/core';
import { WikiRandService } from '../wiki-rand.service';

@Component({
    selector: 'wikirand',
    templateUrl: './wiki-rand.component.html',
    styleUrls: ['./wiki-rand.component.css']
})
export class WikiRandComponent implements OnInit {
    pageId: number
    pageContent: string
    pageURL: string
    randomPageURL: string
    getPageURLByIdURL: string

    constructor(private wikiRandService: WikiRandService) { }

    ngOnInit() {
        this.pageContent = 'hey';
        this.pageURL = '';
        this.getRandomWikiPage();
    }

    getRandomWikiPage(): void {
        const wikiData = this.wikiRandService.getFromLocalStorage('wiki');
        const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        if (wikiData && wikiData['date'] === currentDate) {
            this.pageContent = wikiData['pageContent'];
            this.pageURL = wikiData['pageURL'];
        } else {
            this.wikiRandService.getPage()
                .subscribe(page => {
                    this.pageContent = page;
                    this.wikiRandService.getURL(page.pageid)
                        .subscribe(url => {
                            this.pageURL = url;
                            this.wikiRandService.saveToLocalStorage('wiki', {
                                pageContent: page,
                                pageURL: url,
                                date: currentDate
                            })
                        })
                });
        }
    }

    goToPage(): void {
        window.open(this.pageURL, "_blank");
    }
}
