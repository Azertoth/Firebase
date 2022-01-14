import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fruit: any = '';
  fruits: any[] = [];
  nom: any = '';
  prenom: any = '';
  personnes: any[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    let url = 'https://gestion-equipe.firebaseio.com/personneLio.json';
    // PUT (ecraser le noeud)
    this.httpClient.get<any>(url).subscribe((personnes) => {
      if(personnes != undefined) {
        this.personnes = personnes;
      }
      url = 'https://gestion-equipe.firebaseio.com/fruitsLio.json';
      this.httpClient.get<any>(url).subscribe((fruits) => {
        if (fruits != undefined) {
          this.fruits = fruits;
        }
      });
    });
  }

  onAjouterFruit() {
    // envoyer le fruit au back office
    let url = 'https://gestion-equipe.firebaseio.com/fruitsLio.json';
    this.fruits.push(this.fruit);

    // PUT (ecraser le noeud)
    this.httpClient.put(url, this.fruits).subscribe(() => {
      console.log('ecriture Post ok');
      this.fruit = '';
    });
  }

  onEffacerFruit(i: number) {
    let url = 'https://gestion-equipe.firebaseio.com/fruitsLio.json';
    this.fruits.splice(i, 1);
    this.httpClient.put(url, this.fruits).subscribe(() => {
      console.log('ecriture Post ok');
    });
  }

  onAjouterPersonne() {
    let p: any = {};
    p.nom = this.nom;
    p.prenom = this.prenom;
    this.nom = '';
    this.prenom = '';

    // envoyer la personne au back office
    let url = 'https://gestion-equipe.firebaseio.com/personneLio.json';
    this.personnes.push(p)
    // PUT (ecraser le noeud)
    this.httpClient.put(url, this.personnes).subscribe(() => {
        console.log('ecriture Post ok');
      });
  }

  onEffacerPersonne(i: number) {
    let url = 'https://gestion-equipe.firebaseio.com/personneLio.json';
    this.httpClient.put(url, this.personnes).subscribe(() => {
      console.log('ecriture Post ok');
      this.personnes.splice(i, 1);
    });
  }
}
