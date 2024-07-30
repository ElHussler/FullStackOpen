import { CoursePart } from "../types/types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(part => (
        <div key={part.name} style={{border: "1px solid black"}}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;