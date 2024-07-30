import { assertNever } from "../helpers/helpers";
import { CoursePart } from "../types/types"

interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps) => {
  const part = props.part;

  switch (part.kind) {
    case "basic":
      return (
        <>
          <p style={{fontWeight: "bold", fontSize: "1em"}}>{part.name}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
        </>
      );
    case "group":
      return (
        <>
          <p style={{fontWeight: "bold", fontSize: "1em"}}>{part.name}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group Projects: {part.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <p style={{fontWeight: "bold", fontSize: "1em"}}>{part.name}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Background: {part.backgroundMaterial}</p>
        </>
      );
    case "special":
      return (
        <>
          <p style={{fontWeight: "bold", fontSize: "1em"}}>{part.name}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Required skills:</p>
          <ul>
            {part.requirements.map(req => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;