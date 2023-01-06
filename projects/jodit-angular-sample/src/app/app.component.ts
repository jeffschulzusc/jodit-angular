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
    width: "768px",
    height: "480px",
    enter: "BR",
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_only_text",
  } as any;
  private jodit?: Jodit;

  constructor() {}

  ngAfterViewInit(): void {
    this.jodit = Jodit.make(this.joditdiv?.nativeElement ?? "", this.options);
    this.jodit.setEditorValue(SPIEL);
    this.jodit.events.on("change", (v) => console.log(v));
    this.jodit?.waitForReady().then(() => console.log("jodit is ready"));
  }

  ngOnDestroy(): void {
    this.jodit?.events.off("change");
    this.jodit?.destruct();
    this.jodit = undefined;
  }
}

const SPIEL = `
Sample usage of Jodit in Angular v15.<br>
<br>
To avoid TS2436 error on ng build, must set<br>
<i>"skipLibCheck": true</i> <br>
in tsconfig.json.<br>
Could the Jodit team build the npm package with stricter typing and not use relative paths ?<br>
<br>
Also, i can not find documentation on proper way to 'clean-up' the editor before Angular takes it out of the DOM.<br>
Currently I have:<br>
&nbsp;&nbsp;<i>jodit.events.off(...);</i><br>
&nbsp;&nbsp;<i>jodit.destruct();<br></i>
Is it correct ?
`;
