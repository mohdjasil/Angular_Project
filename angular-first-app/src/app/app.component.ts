import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedActiveTab = 'recipe';

  onNavigate(activeTab : string){
    this.loadedActiveTab = activeTab;
  }
}
