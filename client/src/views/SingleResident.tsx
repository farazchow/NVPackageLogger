import { Component, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { get, deconstruct } from "../../utilities";
import { IResident } from "../../../server/models/resident";
import "../css/residentCheckIn.css";

export const SingleResidentView: FunctionComponent = () => {
  const { id } = useParams();
  console.log("id is", id);
  if (id) {
    return (
      <>
        <ResidentView id={id} />
      </>
    );
  } else {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
};

type State = IResident;

interface objectID {
  id: string;
}

class ResidentView extends Component<objectID, State> {
  constructor(props: objectID) {
    super(props);

    this.state = {
      studentId: "",
      resident: "",
      room: "",
      year: "",
      homeAddress: "",
      forwardingAddress: "",
      date: "",
      checkedIn: true,
    };
  }

  override componentDidMount() {
    get("/api/resident/getResidentById", { id: this.props.id }).then(
      (res: any) => this.setState(res)
    );
  }

  override render() {
    return (
      <>
        <div>{deconstruct(this.state)}</div>
      </>
    );
  }
}
