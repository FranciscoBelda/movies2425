import {Component, inject} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Movie} from "../../common/movie";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import { NgbModal, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    FaIconComponent,
    CommonModule,
    NgbModalModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private readonly movieService: MovieService = inject(MovieService);
  private readonly modalService: NgbModal = inject(NgbModal);

  movies: Movie[] = [];
  genres: string[] = [];


  constructor() {
    this.loadMovies();
  }
  private loadMovies() {
    this.movieService.getMovieList().subscribe(
      {
        next: value => {
          this.movies = value;
        },
        complete: () => {
          console.log('Movies loaded!');
        },
        error: err => {
          console.error(err);
        }
      }
    );
    this.movieService.getGenres().subscribe(
      {
        next: value => {
          this.genres = value;
        },
        complete: () => console.log('Genres loaded.'),
        error: err => {
          console.error(err)}
      }
    )
  }


  // Función para crear una nueva película, para lo que
  // abrirá el modal y pasará el listado de géneros
  newMovie() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.editar = false;
    modalRef.componentInstance.genres = this.genres;
  }
  /* Función para editar una película, para lo que abrirá
   el modal y pasará la película y el listado de géneros */
  loadMovie(movie: Movie) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.movie = movie;
    modalRef.componentInstance.editar = true;
    modalRef.componentInstance.genres = this.genres;

    // Esto se ejecutará cuando el modal se cierre
    modalRef.result.then(() => {
      this.loadMovies();
    }).catch(() => {
      this.loadMovies();
    });
  }

  removeMovie(movie: Movie) {
    if(confirm('Are You sure that You want to delete the movie '+movie.title)){
      this.movieService.deleteMovie(movie._id).subscribe(
        {
          next: value => {
            console.log(value);
          },
          complete: () => {
            console.log('Delete complete.')
          },
          error: err => console.error(err)
        }
      )
    }

  }

  protected readonly faTrashCan = faTrashCan;
}
