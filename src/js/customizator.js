export default class Customizator {
	constructor() {
		this.btnBlock = document.createElement("div");
		this.colorPicker = document.createElement("input");

		this.clear = document.createElement("div");
		this.scale = localStorage.getItem("scale") || 1;
		this.color = localStorage.getItem("color") || "#ffffff";

		this.btnBlock.addEventListener("click", (e) => this.onScaleChange(e));
		this.colorPicker.addEventListener("input", (e) => this.onColorChange(e));
		this.clear.addEventListener("click", () => this.reset());
	}
	onScaleChange(e) {
		const body = document.querySelector("body");
		if (e) {
			this.scale = +e.target.value.replace(/x/g, "");
		}
		const recursy = (element) => {
			element.childNodes.forEach((node, i) => {
				if (
					node.nodeName === "#text" &&
					node.nodeValue.replace(/\s+/g, "").length > 0
				) {
					if (!node.parentNode.getAttribute("data-fz")) {
						let value = window.getComputedStyle(node.parentNode, null).fontSize; // ia marimea textului
						node.parentNode.setAttribute("data-fz", +value.replace(/px/g, ""));
						node.parentNode.style.fontSize =
							node.parentNode.getAttribute("data-fz") * this.scale + "px";
					} else {
						node.parentNode.style.fontSize =
							node.parentNode.getAttribute("data-fz") * this.scale + "px";
					}
				} else {
					recursy(node);
				}
			});
		};
		recursy(body);
		localStorage.setItem("scale", this.scale);
	}

	onColorChange(e) {
		const body = document.querySelector("body");
		body.style.backgroundColor = e.target.value;
		localStorage.setItem("color", e.target.value);
	}

	setBgColor() {
		const body = document.querySelector("body");
		body.style.backgroundColor = this.color;
		this.colorPicker.value = this.color;
	}
	injectStyle() {
		const style = document.createElement("style");
		style.innerHTML = `
      .panel {
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: fixed;
          top: 10px;
          right: 0;
          border: 1px solid rgba(0,0,0, .2);
          box-shadow: 0 0 20px rgba(0,0,0, .5);
          width: 300px;
          height: 60px;
          background-color: #fff;
      
      }
      
      .scale {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100px;
          height: 40px;
          
      }
      .scale_btn {
         display: block;
         width: 40px;
         height: 40px;
         border: 1px solid rgba(0,0,0, .2);
         border-radius: 4px;
         font-size: 18px;
     }
      .color {
          width: 40px;
          height: 40px;
      }
      .clear{
         font-size:20px;
         cursor:pointer;
      }`;
		document.querySelector("head").append(style);
	}

	reset() {
		localStorage.clear();
		this.scale = 1;
		this.color = "#ffffff";
		this.setBgColor();
		this.onScaleChange();
	}
	render() {
		//bagams stilurile
		this.injectStyle();
		this.setBgColor();
		this.onScaleChange();
		//cream ScaleInputS
		let scaleInputS = document.createElement("input");
		scaleInputS.classList.add("scale_btn");
		scaleInputS.setAttribute("type", "button");
		scaleInputS.setAttribute("value", "1x");
		//cream ScaleInputM
		let scaleInputM = document.createElement("input");
		scaleInputM.classList.add("scale_btn");
		scaleInputM.setAttribute("type", "button");
		scaleInputM.setAttribute("value", "1.5x");
		//Adaugam class la blocul de la Scale si inseram butoanele
		this.btnBlock.classList.add("scale");
		this.btnBlock.append(scaleInputS, scaleInputM);
		//adaugam clasa si atributele la color
		this.colorPicker.classList.add("color");
		this.colorPicker.setAttribute("type", "color");
		this.colorPicker.setAttribute("value", "#ffffff");
		//x
		this.clear.innerHTML = "&times";
		this.clear.classList.add("clear");

		//Cream si inseram blocul cu btn si color
		let panel = document.createElement("div");
		panel.classList.add("panel");
		panel.append(this.btnBlock, this.colorPicker, this.clear);
		//bagaam totul in body
		document.querySelector("body").append(panel);
	}
}
