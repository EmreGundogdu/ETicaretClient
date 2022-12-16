import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService, private spinner: NgxSpinnerService, public dialog: MatDialog,private alertifyService:AlertifyService) {
    const img = this._renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer");
    img.weigth = 25;
    img.width = 25;
    _renderer.appendChild(element.nativeElement, img)
  }
  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallPulseSync)
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement)
          .animate({
            opacity: 0,
            left: "+=50",
            height: "toggle",
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message("Ürün silindi",{
              dismissOthers:true,
              messageType:MessageType.Success,
              position:Position.BottomRight
            })
          });
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.BallPulseSync);
        this.alertifyService.message("Ürün silinemedi",{
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.BottomRight
        });
      });
    })
  }
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes)
        afterClosed();

    })
  }
}
