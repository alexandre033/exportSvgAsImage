import * as React from "react";
import './style.scss'
import { PNG } from "./constant"

export type Props = {
  svgRef: any;
  scale?: number;
  compression?: number;
  type?:"image/png"| "image/jpeg";
  fileName: string;
  backgroundColor?: string | null;
  svgTitle?: string;
  buttonTitle?: string;
  classes?: string;
};

function setFileName(title: string) {
  const fileTitle = title.split(" ").join("_");
  return fileTitle;
}

function setGroup(width: number, height: number) {
  const xmlns = "http://www.w3.org/2000/svg";
  const group = document.createElementNS(xmlns, "svg");
  group.setAttributeNS(null, "viewbox", "0 0 100 100");
  group.setAttributeNS(null, "width", `${width}`);
  group.setAttributeNS(null, "height", `${height}`);
  return group;
}

function setSvgTitle(title: string) {
  const xmlns = "http://www.w3.org/2000/svg";
  const chartTitle = document.createElementNS(xmlns, "text");
  chartTitle.setAttributeNS(null, "font-size", "25");
  chartTitle.setAttributeNS(null, "font-family", "helvetica");
  chartTitle.setAttributeNS(null, "x", "50%");
  chartTitle.setAttributeNS(null, "y", "35");
  chartTitle.setAttributeNS(null, "text-anchor", "middle");
  chartTitle.textContent = title;

  return chartTitle;
}

function ExportChartAsImage({
  svgRef,
  scale = 1,
  compression = 1.0,
  type = PNG,
  fileName,
  svgTitle,
  backgroundColor = null,
  buttonTitle = "Export",
  classes,
}: Props) {
  const downloadImage = () => {
    // Find the svg by ref
    const { current } = svgRef;
    const selectedSvg = current;
    const width = selectedSvg.clientWidth + 100 * scale;
    const height = selectedSvg.clientHeight + 100 * scale;
    const canvasWidth = width;
    const canvasHeight = height;
    const clonedSvgElement = selectedSvg.cloneNode(true) as SVGElement;

    // tricks for firefox rendering
    const widthAttribute = width - 50;
    const heightAttribute = height - 50;
    clonedSvgElement.setAttribute("width", widthAttribute.toString());
    clonedSvgElement.setAttribute("height", heightAttribute.toString());
    clonedSvgElement.setAttribute("x", "25");
    clonedSvgElement.setAttribute("y", "50");

    const newSVG = setGroup(width, height);

    if (svgTitle) {
      const title = setSvgTitle(svgTitle);
      newSVG.appendChild(title);
    }

    newSVG.appendChild(clonedSvgElement);

    const xml = new XMLSerializer().serializeToString(newSVG);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(blob);

    // Create a canvas for drawing the new img
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    // Add the img into the canvas and download it
    image.onload = () => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context!.fillStyle = backgroundColor ??  "transparent";
      context!.fillRect(0, 0, canvasWidth, canvasHeight);
      context!.drawImage(image, 0, 0, width, height, 0, 0, width, height);

      const imgUri = canvas.toDataURL(type, compression);
      const link = document.createElement("a");
      link.download = setFileName(fileName);
      link.href = imgUri;
      link.click();
    };
    image.src = blobURL;
  };
  return (
    <button
      aria-label="Export"
      onClick={() => downloadImage()}
      className={`exportBtn ${classes}`}
    >
      {buttonTitle}
    </button>
  );
}

export default ExportChartAsImage;
