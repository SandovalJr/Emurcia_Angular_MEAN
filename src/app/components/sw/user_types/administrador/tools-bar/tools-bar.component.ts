import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../../../../services/authentication.service'

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: ['./tools-bar.component.scss']
})
export class ToolsBarComponent implements OnInit {
  details: UserDetails
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }
}
