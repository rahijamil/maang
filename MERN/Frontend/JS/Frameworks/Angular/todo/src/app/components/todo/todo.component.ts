import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { debounceTime, switchMap } from 'rxjs/operators'

import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser'
import { Todo } from 'src/app/types/todo.type';
import { addDoc } from '@firebase/firestore';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition(":enter", [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class TodoComponent implements OnInit, OnDestroy {
  title: string = "Todo";
  todoText: string = "";
  id!: string;

  pageData!: {
    id: string;
    title: string;
    todos: Todo[]
  }

  @ViewChild('title', { static: true })
  titleElement!: ElementRef<HTMLDivElement>;

  @ViewChild('todoInput', { static: true })
  addTodoElement!: ElementRef<HTMLDivElement>;

  private titleUpdateSubject = new Subject<string>();
  private titleUpdateSubscription!: Subscription;

  constructor(
    private sharedService: SharedService,
    private titleService: Title,
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute
  ) { }

  private unsubscribe: (() => void) | undefined;

  ngOnInit(): void {

    this.titleUpdateSubscription = this.titleUpdateSubject
      .pipe(debounceTime(300))
      .subscribe((title: string) => {
        this.setTitle(title)
      });

    this.activatedRoute.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get("id");

        if (id) {
          this.id = id;

          return this.fetchPageData();
        }
        else {
          return of(null);
        }
      })
    ).subscribe();

    this.fetchPageData();
  }

  updateTodo(todo: Todo, updateData: Partial<Todo>) {
    updateDoc(doc(this.firestore, "pages", this.pageData.id, "todos", todo.id), updateData).catch(err => console.error(err));
  }

  updateTodoText(event: FocusEvent, todo: Todo) {
    const target = event.target as HTMLElement;
    const newTitle = target.textContent;
    if (newTitle !== null && newTitle.trim() !== todo.title.trim()) {
      this.updateTodo(todo, { title: newTitle.trim() });
    }
  }

  count = 0;
  deleteTodo(event: any, todo: Todo) {
    if (event.target.textContent.length == 0) {
      this.count++;
    }

    if (this.count == 2) {
      deleteDoc(doc(this.firestore, "pages", this.pageData.id, "todos", todo.id)).catch((err) => console.error(err))
    }
  }

  fetchPageData(): Observable<any> {

    return new Observable((observer) => {
      this.unsubscribe = onSnapshot(doc(this.firestore, "pages", this.id), (docSnap) => {
        if (docSnap.exists()) {
          this.pageData = {
            ...docSnap.data() as { title: string },
            id: docSnap.id,
            todos: []
          };

          onSnapshot(collection(this.firestore, "pages", this.id, "todos"), (todosSnap) => {
            const todos: Todo[] = [];

            todosSnap.forEach((todoDoc) => {
              todos.push({
                ...todoDoc.data() as Todo,
                id: todoDoc.id
              });

              this.pageData.todos = todos;
            })

          }, (todosErr) => console.error(todosErr))

          this.titleElement.nativeElement.textContent = this.pageData.title;
          this.titleElement.nativeElement.removeAttribute("placeholder");
          this.titleService.setTitle(this.pageData.title);
        }

        observer.next();
      });
    })
  }

  onInput(event: any) {
    const target = event.target as HTMLDivElement;
    target.classList.toggle("has-content", target.textContent!.trim().length > 0);

    const title = target.textContent as string;

    this.titleUpdateSubject.next(title);
  }

  ngOnDestroy(): void {
    this.titleUpdateSubscription;

    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  toggleTodoPlaceholder(event: any) {
    const target = event.target as HTMLDivElement;
    target.classList.toggle('has-todo-content', target.textContent!.length > 0);

    this.todoText = target.textContent as string;
  }

  handleAddTodo(event: any) {
    if (event.target.textContent.length > 0) {
      const data = {
        title: this.todoText,
        completed: false,
        createdAt: new Date()
      };

      addDoc(collection(this.firestore, "pages", this.pageData.id, "todos"), data);

      event.target.textContent = "";
      this.toggleTodoPlaceholder(event);
      event.target.focus();
    }
  }

  focusTitle() {
    this.titleElement.nativeElement.focus();
  }

  focusAddTodo() {
    this.addTodoElement.nativeElement.focus()
  }

  focusTodoItem(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
      const todoText = (event.target as HTMLElement).querySelector('.todo_text');
      if (todoText) {
        (todoText as HTMLElement).focus();
      }
    }
  }

  setTitle(newTitle: string) {
    if (newTitle.length > 0) {
      this.titleService.setTitle(newTitle);

      updateDoc(doc(this.firestore, "pages", this.id), {
        title: newTitle
      }).catch((err) => console.error(err))
    }
    else {
      this.titleService.setTitle("Untitled");

      updateDoc(doc(this.firestore, "pages", this.id), {
        title: "Untitled"
      }).catch((err) => console.error(err))
    }
  }
}
