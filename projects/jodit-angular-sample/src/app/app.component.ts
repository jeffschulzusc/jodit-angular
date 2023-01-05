import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { Jodit } from "jodit";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild("joditdiv", { static: false }) joditdiv?: ElementRef;

  private readonly defaultbuttons =
    "undo, redo,|,font,fontsize,brush,|,bold,italic,underline,strikethrough,|,ul,ol,|,indent,outdent,align,|,link,|,paragraph,source";
  private readonly minimalbuttons =
    "bold,italic,underline,brush,paragraph,ul,ol";
  private readonly options = {
    allowResizeY: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    height: "100%",
    enter: "BR",
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_only_text",
  } as any;
  private jodit?: Jodit;

  constructor() {}

  ngAfterViewInit(): void {
    this.jodit = Jodit.make(this.joditdiv?.nativeElement ?? "", this.options);
    this.jodit?.waitForReady().then(() => console.log("jodit is ready"));
  }

  ngOnDestroy(): void {
    this.jodit?.destruct();
    this.jodit = undefined;
  }
}
