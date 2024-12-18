import {Component, inject, Input, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Movie} from "../../common/movie";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';


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
  activeModal = inject(NgbActiveModal);
  faPlusCircle = faPlusCircle;

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

  // Form para nuevo género
  myNewGenre = new FormGroup({
    newGenre: new FormControl('')
  });

  // GETTERS
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


  // Función para añadir un nuevo género
  addNewGenre(newGenre: any) {
    let newGenres;
    // si es nueva película añadimos el género a nuestra
    // lista de géneros de la base de datos
    if (!this.editar)this.genres.push(newGenre);
      // si no entonces tenemos que añadir el género a los géneros
    //  seleccionados de la película que estamos actualizando
    else {
      // Cogemos los géneros actuales
      newGenres = this.formMovie.getRawValue().genres;
      // Le añadimos el nuevo género a los actuales y al auxiliar
      newGenres.push(newGenre);
      this.genres.push(newGenre);
      // Actualizamos los géneros seleccionados con el auxiliar
      this.formMovie.setControl('genres',new FormControl(newGenres));
    }
    this.myNewGenre.reset();
  }

  // Método para añadir o editar, según el valor de la variable editar
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
