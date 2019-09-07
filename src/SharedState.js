import _ from "lodash";
import createSharedState from "react-hook-shared-state";
import Session from "./utils/Session";

export const [useAccount, setAccount] = createSharedState(Session.current());
