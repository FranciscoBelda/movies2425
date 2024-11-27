import {Component, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Movie} from "../../common/movie";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  @Input({required: true}) movie!: Movie;
  @Input({required: true}) editar!: boolean;
  @Input({required: true}) genres!: string[];
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  activeModal = inject(NgbActiveModal);
  faPlusCircle = faPlusCircle;
  private readonly modalService: NgbModal = inject(NgbModal);

  private readonly movieService: MovieService = inject(MovieService);

  private readonly formBuilder: FormBuilder  = inject(FormBuilder);
  formMovie: FormGroup = this.formBuilder.group({
    _id: [''],
    title: [''],
    year: [''],
    director: [''],
    plot: [''],
    genres: [],
    poster: [''],
    imdb: this.formBuilder.group({
      rating: [0],
      votes: [0]
    })
  });

  myNewGenre = new FormGroup({
    newGenre: new FormControl('')
  });



  get title(): any{
    return this.formMovie.get('title');
  }
  get year(): any{
    return this.formMovie.get('year');
  }
  get director(): any{
    return this.formMovie.get('director');
  }
  get plot(): any{
    return this.formMovie.get('plot');
  }
  get genresF(): any{
    return this.formMovie.get('genresF');
  }
  get poster(): any{
    return this.formMovie.get('poster');
  }
  get rating(): any{
    return this.formMovie.get('imdb.rating');
  }
  get votes(): any{
    return this.formMovie.get('imdb.votes');
  }
  get newGenre(): any{
    return this.myNewGenre.get('newGenre');
  }






  addNewGenre(newGenre: any) {
    let newGenres;
    if (!this.editar)this.genres.push(newGenre);
    else {
      newGenres = this.formMovie.getRawValue().genres;
      newGenres.push(newGenre);
      this.genres.push(newGenre);
      this.formMovie.setControl('genres',new FormControl(newGenres));
    }
    this.myNewGenre.reset();
  }

  onSubmit() {
    if(this.editar){
      this.movieService.updateMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
          },
          complete: () => {
            console.log('Updated');
            this.activeModal.dismiss();
          },
          error: err => {
            console.error(err)}
        }
      )
    }else {
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
          },
          complete: () => {
            console.log('Movie added');},
          error: err => {
            console.error(err);
          }
        }
      )
    }
  }

  ngOnInit(): void {
    if (this.editar){
      this.formMovie.setValue(this.movie);
    }else {
      this.formMovie.reset();
    }
  }
}
