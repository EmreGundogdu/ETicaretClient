import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertify: AlertifyService, private customToastr: CustomToastrService, private spinner: NgxSpinnerService, private dialog: MatDialog, private dialogService: DialogService) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClsoed: () => {
        this.spinner.show(SpinnerType.BallPulseSync);
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
          const message: string = "Dosyalar başarıyla yüklendi";
          this.spinner.hide(SpinnerType.BallPulseSync)
          if (this.options.isAdminPage) {
            this.alertify.message(message, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopLeft
            })
          } else {
            this.customToastr.message(message, "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomLeft
            })
          }
        }, (errorResponse: HttpErrorResponse) => {

          const message: string = "Dosyalar yüklenirken hata meydana geldi";
          this.spinner.hide(SpinnerType.BallPulseSync)
          if (this.options.isAdminPage) {
            this.alertify.message(message, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopLeft
            })
          } else {
            this.customToastr.message(message, "Başarılı", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomLeft
            })
          }
        });
      }
    });
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState.Yes)
  //       afterClosed();
  //   });
  // }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
