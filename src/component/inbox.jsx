import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCalls } from "../store/reducer/index";
import { arrayGroupBy } from "../utils/group";
import moment from "moment";

const Inbox = (__props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllCalls());
  }, []);

  let calls = useSelector((state) => state.main.calls);

  calls = calls
    .filter((item) => item.direction === "inbound" && !item.is_archived)
    .map((item) =>
      Object.assign({}, item, {
        Date: moment(item.created_at).format("MM DD YY"),
      })
    );

  let groupedCalls = arrayGroupBy(calls, "Date");

  return (
    //groupedcalls to be 0 length?
    <div>
      {groupedCalls.map((item1) => {
        return (
          <div className="call_date">
            {item1[0].Date}
            {item1.map((item2) => {
              return (
                <div>
                  <div>
                    <div>{item2.from}</div>
                    <div>Try to call on {item2.via}</div>
                  </div>
                  <div>{item2.created_at}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;
