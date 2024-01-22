import {
  TLBaseShape,
  TLDefaultColorStyle,
  ShapeProps,
  T,
  DefaultColorStyle,
  ShapeUtil,
  BaseBoxShapeUtil,
  HTMLContainer,
  Rectangle2d,
  getDefaultColorTheme,
  TLShapeId,
  useEditor, 
  resizeBox,
  TLOnResizeHandler,
  TextShapeUtil,
  EnumStyleProp, 
} from '@tldraw/tldraw';
import { useEffect } from 'react';
import Image from 'next/image';
import { TextLabel } from '../helpers/textLabel';
import { ShapePropsType } from '../helpers/deepTldraw';


const BASE_ASPECT_HEIGHT = 40
const MIN_ASPECT_WIDTH = 120

export declare const aspectShapeProps: {
  color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
  size: EnumStyleProp<"l" | "m" | "s" | "xl">;
  font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
  align: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
  verticalAlign: EnumStyleProp<"end" | "middle" | "start">;
  growY: T.Validator<number>;
  text: T.Validator<string>;
  w: T.Validator<number>;
  h: T.Validator<number>;
};

declare type IAspectShape = TLBaseShape<'aspect', AspectShapeProps>;

declare type AspectShapeProps = ShapePropsType<typeof aspectShapeProps>;


export default class AspectShape extends ShapeUtil<IAspectShape> {
  static override type = 'aspect' as const;

  override isAspectRatioLocked = (_shape: IAspectShape) => false
	override canResize = (_shape: IAspectShape) => true
	override hideSelectionBoundsFg = (_shape: IAspectShape) => true
  override canEdit = () => true
  // override hideResizeHandles = () => true
  
  override onResize: TLOnResizeHandler<IAspectShape> = (shape, info) => {
		return resizeBox(shape, info)
	}

  onDoubleClick = (shape: IAspectShape) => {
    console.log("double click: ", shape)
  }

  getDefaultProps(): IAspectShape['props'] {
    return {
      text: "...",
      color: 'black', 
      size: 'm',
      font: 'mono',
      align: 'middle',
      verticalAlign: 'middle',
      growY: 0,
      w: MIN_ASPECT_WIDTH,
      h: BASE_ASPECT_HEIGHT,
    };
  }


  getGeometry(shape: IAspectShape) {
    console.log("heres the geometry: ", shape)
    // This method should return a Rectangle2d instance with the shape's geometry
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  

  component(shape: IAspectShape) {
    // const bounds = this.editor.getShapeGeometry(shape).bounds

    const {
      id, type, props: { w, h, color, text } 
    } = shape;
    const { x, y } = shape;
    // const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() });
    // const fillColor = theme[color].semi;     
  
    return (
      <HTMLContainer 
        style={{width: w, height: h}} 
        className={`grid grid-cols-[auto,1fr,auto] items-center
          text-xs font-bold
          bg-red-100 bg-opacity-60 
          rounded-lg shadow-inner shadow-md
          min-w-[120px] min-h-[40px]
          `}
      >
          <div className="flex flex-col justify-center items-center ml-1 mr-2 mb-1">
            <img src='/icons/aspects/belief.png' alt="belief icon" className="w-5 h-5 mt-1"/>
            <img src='/icons/aspects/career-options.png' alt="belief icon" className="w-5 h-5 mt-1"/> 
            <img src='/icons/aspects/open-book.png' alt="belief icon" className="w-5 h-5 mt-1"/>
          </div>
          <div className="flex justify-center items-center p-2">
            <TextLabel 
							id={id}
							type="text"
							font="mono"
							size="m"
							align="middle"
							verticalAlign="middle"
							text={text}
							labelColor="black"
							wrap
						/>
          </div>
          <div className="flex justify-center items-center mr-1 mb-1">
            <img src='/icons/zones/craft.png' alt="craft icon" className="w-5 h-5 mt-1"/>
          </div>
      </HTMLContainer>
    );
  }

  indicator(shape: IAspectShape) {
    const width = Math.max(shape.props.w, MIN_ASPECT_WIDTH);
    const height = Math.max(shape.props.h, BASE_ASPECT_HEIGHT);
    return <rect width={width} height={height} />
  }
}


// export interface AspectProps {
//   aspectId: TLShapeId;
//   x: number;
//   y: number;
//   tag: string;
//   color: string; 
// }

// export const Aspect: React.FC<AspectProps> = ({ aspectId, x, y, tag, color }) => {
//   const editor = useEditor();

//   useEffect(() => {
//     // Run only once to create the shape
//     editor.createShape({
//       id: aspectId,
//       type: AspectShape.type,
//       props: { x, y, color, tag, width: 400, height: 400 },
//     });

//     // Cleanup function to remove the shape if the component is unmounted
//     return () => {
//       editor.deleteShape(aspectId);
//     };
//   }, [editor, aspectId, x, y, tag, color]); // Re-run this effect if the props change

//   return null; // This component does not render anything itself
// };