import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, query, where } from '@angular/fire/firestore';
import { PAGE_STATUS, PageStatus } from 'src/app/constants/page.constant';

import { Todo } from 'src/app/types/todo.type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(private firestore: Firestore, private router: Router, private activatedRoute: ActivatedRoute) { }

  pageLists: { id: string; title: string, todos: Todo[], status: string; createdAt?: Date }[] = [];

  private unsubscribe: (() => void) | undefined;

  activeId!: string;

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.activeId = params.get('id') || "";
    })

    this.fetchPages();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  fetchPages() {
    this.unsubscribe = onSnapshot(query(collection(this.firestore, "pages"), where("status", "==", PAGE_STATUS.PUBLISHSED)), (pagesSnap) => {
      this.pageLists = [];

      pagesSnap.docs.map((page: any) => {
        this.pageLists.push({ id: page.id, ...page.data() });
      })
    }, (err) => {
      console.error(err.code)
    })
  }

  addPage() {
    addDoc(collection(this.firestore, "pages"), {
      title: "Untitled",
      status: PAGE_STATUS.PUBLISHSED,
      createdAt: new Date()
    })
      .then((response) => {
        addDoc(collection(this.firestore, `pages/${response.id}/todos`), {
          title: "Sample Todo",
          completed: false,
        }).then(() => {
          this.router.navigate(['/new'], {
            queryParams: {
              id: response.id
            }
          })
        }).catch((err) => console.error(err));
      })
      .catch((err) => console.error(err.code));
  }

  showMoreOption(event: any) {
    let showMoreLists = document.querySelectorAll('.showMoreList');

    if (showMoreLists && showMoreLists.length > 0) {
      showMoreLists.forEach((showMoreList) => {
        if (showMoreList != event.target) {
          showMoreList.remove()
        }
      })
    }

    event.stopPropagation();
    event.target.nextSibling.classList.toggle('showMoreList');

  }
}
