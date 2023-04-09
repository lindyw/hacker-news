import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public userId: string = this.route.snapshot.paramMap.get('id')!;
    public user: User;
    public isLoading = true;

    constructor(
        public router: Router,
        private userService: UserService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.userService.getUserbyId(this.userId!)
            .subscribe(user => {
                this.user = user;
                this.isLoading = false;
            })
    }

}
