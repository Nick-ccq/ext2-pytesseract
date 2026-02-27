import ArgumentType from '../utils/argument-type';
import BlockType from '../utils/block-type';
import blockIconURI from './image/blockicon.svg';
import menuIconURI from './image/menuicon.svg';
import Func from './func';
import {setLocaleData, formatMessage, setLocale} from '../utils/translation';
import LocaleData from "./locales"
setLocaleData(LocaleData)


class Extension {
    constructor(runtime, extensionId) {
        this.runtime = runtime;
        // Arduino模式的执行方法
        this.funcs = new Func(runtime, extensionId);
    }

    // 切换翻译的钩子
    setLocale(locale) {
        setLocale(locale);
    }

    // 固定函数名, Arduino返回block的生成代码方法
    getCodePrimitives() {
        return this.funcs;
    }

    // 固定函数名, 返回block信息, 必须有该方法
    getInfo() {
        return {
            name: formatMessage({
                id: 'gui.blocklyText.pytesseract.extensionName',
                default: 'pytesseract'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            color1: '#A0522D',
            color2: '#8F4A2A',
            color3: '#7A3F24',
            blocks: [
                {
                    opcode: 'matplotlib_Iint',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.pytesseract.matplotlib_Iint',
                        default: '初始化摄像头直到成功 编号[CAMNUM]'
                    }),
                    arguments: {
                        CAMNUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'matplotlib_Iintsize',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.pytesseract.matplotlib_Iintsize',
                        default: '打开摄像头画面进行读取'
                    })
                },
                {
                    opcode: 'matplotlib_rcParams',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.pytesseract.matplotlib_rcParams',
                        default: '保存图片到文件夹 路径[PATH]返回识别内容[LIST]'
                    }),
                    arguments: {
                        PATH: {
                            type: ArgumentType.STRING,
                            inputParams: {
                                symbol: '""'
                            },
                            defaultValue: '/root/pytesseract/pic/'
                        },
                        LIST: {
                            type: ArgumentType.STRING,
                        
                            defaultValue: 'text'
                        }
                    }
                },
                {
                    opcode: 'drawText',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gui.blocklyText.pytesseract.drawText',
                        default: '在摄像头画面上显示文字[TEXT]大小[SIZE] 颜色R[R]G[G]B[B] 坐标X[X]Y[Y]'
                    }),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            inputParams: {
                                symbol: '""'
                            },
                            defaultValue: '你好'
                        },
                        SIZE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 25
                        },
                        R: {
                            type: ArgumentType.SLIDER,
                            inputParams: {
                                rangeMin: 0,
                                rangeMax: 255
                            },
                            defaultValue: 50
                        },
                        G: {
                            type: ArgumentType.SLIDER,
                            inputParams: {
                                rangeMin: 0,
                                rangeMax: 255
                            },
                            defaultValue: 200
                        },
                        B: {
                            type: ArgumentType.SLIDER,
                            inputParams: {
                                rangeMin: 0,
                                rangeMax: 255
                            },
                            defaultValue: 0
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 20
                        }
                    }
                }
            ]
        };
    }
}


export default Extension;