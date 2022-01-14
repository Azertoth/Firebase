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
    let url = 'https://gestion-equipe.firebaseio.com/';
    // créer un noeud
    let noeud = 'personneLio.json';
    url = url + noeud;
    // PUT (ecraser le noeud)
    // POST
    this.httpClient.get<any>(url).subscribe((personne) => {
      this.personnes = personne;
      url = 'https://gestion-equipe.firebaseio.com/fruitsLio.json';
      this.httpClient.get<any>(url).subscribe((fruits) => {
        console.log(fruits);
        this.fruits = fruits;
      });
    });
    
  }

  onAjouterFruit() {
    // envoyer le fruit au back office
    let url = 'https://gestion-equipe.firebaseio.com/';
    // créer un noeud
    let noeud = 'fruitsLio.json';
    this.httpClient.get<any>(url).subscribe((fruits) => {
      this.fruits = fruits;
    });
    url = url + noeud;
    this.fruits.push(this.fruit);
    // PUT (ecraser le noeud)
    // POST
    this.httpClient.put(url, this.fruits).subscribe(() => {
      console.log('ecriture Post ok');
    });
  }

  onEffacerFruit(i:number) {
    this.fruits.splice(i, 1);
    let url = 'https://gestion-equipe.firebaseio.com/fruitsLio.json';
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
    let url = 'https://gestion-equipe.firebaseio.com/';
    this.httpClient.get<any>(url).subscribe((personnes) => {
      this.personnes = personnes;
    });
    this.personnes.push(p);
    // créer un noeud
    let noeud = 'personneLio.json';
    url = url + noeud;
    // PUT (ecraser le noeud)
    // POST
    this.httpClient.put(url, this.personnes).subscribe(() => {
      console.log('ecriture Post ok');
    });
  }

  onEffacerPersonne(i:number) {
    this.personnes.splice(i, 1);
    let url = 'https://gestion-equipe.firebaseio.com/personneLio.json';
    this.httpClient.put(url, this.personnes).subscribe(() => {
      console.log('ecriture Post ok');
    });
  }
}
