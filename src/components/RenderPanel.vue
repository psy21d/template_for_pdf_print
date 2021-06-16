<template>
  <button @click="canvas">html2canvas</button>
</template>

<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
// Default export is a4 paper, portrait, using millimeters for units
//const doc = new jsPDF();

let printPDF = (doc, screenshots) => {
  for (let i=0; i<screenshots.length; i++) {
    doc.addImage(screenshots[i].base64image, 0, 0);
    if (i<screenshots.length -1 ) doc.addPage();
  }
  doc.save();
  doc.autoPrint();
  doc.output("dataurlnewwindow"); // this opens a new popup,
}

let tocanvas = () => {
  let pages = window.document.getElementsByClassName("page");
  let doc = new jsPDF();
  let screenshots = [];
  let promises = [];
  html2canvas(pages[0])
  pages.forEach((page, number) => {
    promises.push(
      new Promise((resolve, reject) => {
        html2canvas(page).then(function(canvas) {
        // Export the canvas to its data URI representation
          var base64image = canvas.toDataURL("image/png");
          screenshots.push(base64image)
          resolve({
            base64image,
            number
          })
          // Open the image in a new window
        }).catch(err => reject(err));
      })
    );
  });
  Promise.all(promises).then(
    (results) => printPDF(
      doc, results.sort((a, b) => {
          return a.number - b.number
      })
    )
  )
}

export default {
  data() {
    return {
      printPDF,
      tocanvas,
    }
  },

  props: {
    editor: Object,
  },

  methods: {
    canvas() {
      tocanvas();
    }
  }
}
</script>