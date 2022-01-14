import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'controle-gastos-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menus: any[] = [
    {
      id: 3,
      name: 'Home',
      icon: 'pi pi-home',
      menuPai: null,
      url: '/authpages'
    },
    {
      id: 2,
      name: 'Meu Perfil',
      icon: 'bi bi-person',
      menuPai: null,
      url: '/authpages/teste'
    },
    {
      id: 1,
      name: 'Gerencimento',
      icon: 'pi pi-briefcase',
      menuPai: null,
      itens: [
        {
          name: 'Planilhas',
          icon: 'pi pi-file-excel',
          url: '/authpages/month'
        },
        {
          name: 'Cargos',
          icon: 'pi pi-briefcase',
          url: '/authpages/teste'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
