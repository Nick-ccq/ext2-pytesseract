
class Func {
    constructor(runtime, extensionId) {
        this.runtime = runtime;
    }
	
matplotlib_Iint(generator, block, parameter) {
        let num = parameter.CAMNUM.code;
        generator.addImport(`import time\nimport cv2\nimport pytesseract\nfrom PIL import Image,ImageFont,ImageDraw\nimport os\nimport numpy as np`);
        generator.addInit('pytesseract_draw_chinese', `def drawChinese(text,x,y,size,r, g, b, a,img):\n    font = ImageFont.truetype("HYQiHei_50S.ttf", size)\n    img_pil = Image.fromarray(img)\n    draw = ImageDraw.Draw(img_pil)\n    draw.text((x,y), text, font=font, fill=(b, g, r, a))\n    frame = np.array(img_pil)\n    return frame`);
        return `pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'\ncap = cv2.VideoCapture(${num})\ncap.set(cv2.CAP_PROP_FRAME_WIDTH, 240)\ncap.set(cv2.CAP_PROP_FRAME_HEIGHT, 320)\ncap.set(cv2.CAP_PROP_BUFFERSIZE, 1)\ncv2.namedWindow('cvwindow',cv2.WND_PROP_FULLSCREEN)\ncv2.setWindowProperty('cvwindow', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)\nwhile not cap.isOpened():\n    continue`;
    }

    matplotlib_Iintsize(generator, block, parameter) {
        return `cv2.waitKey(5)\ncvimg_success, img_src = cap.read()\ncvimg_h, cvimg_w, cvimg_c = img_src.shape\ncvimg_w1 = cvimg_h*240//320\ncvimg_x1 = (cvimg_w-cvimg_w1)//2\nimg_src = img_src[:, cvimg_x1:cvimg_x1+cvimg_w1]\nimg_src = cv2.resize(img_src, (240, 320))\ncv2.imshow('cvwindow', img_src)`;
    }

    matplotlib_rcParams(generator, block, parameter) {
        let path = parameter.PATH.code;
        // 去除引号
        path = path.replace(/"/g, '');
        let list = parameter.LIST.code;

        return `${list} = []\ntry:\n    if not os.path.exists("${path}"):\n        print("The folder does not exist,created automatically")\n        os.system("mkdir -p ${path}")\nexcept IOError:\n    print("IOError,created automatically")\n    break\nimage_path = os.path.join("${path}", "image.png")\ncv2.imwrite(image_path,img_src)\ntime.sleep(0.2)\nimg = Image.open(image_path)\n${list} = pytesseract.image_to_string(img, lang='chi_sim')`;
    }

    drawText(generator, block, parameter) {
        let txt = parameter.TEXT.code;
        let size = parameter.SIZE.code;
        let r = parameter.R.code;
        let g = parameter.G.code;
        let b = parameter.B.code;
        let x = parameter.X.code;
        let y = parameter.Y.code;

        return `img_src = drawChinese(text=str(${txt}),x=${x}, y=${y},size=${size},r= ${r},g=${g},b=0,a=${b},img=img_src)\ncv2.imshow('cvwindow', img_src)`;
    }
}

export default Func;