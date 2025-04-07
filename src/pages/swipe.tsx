import {
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

import SwipeCard from "@c./SwipeCard";

import { useJobs, useUpdateUserDoc, useUserDoc } from "hooks";

import ChevronLeft from "icons/ChevronLeft";
import ChevronRight from "icons/ChevronRight";

let Swipe: NextPage = () => {
  const [current, setCurrent] = useState(0);

  const [appID, setAppID] = useState<string[]>([]);

  const [rejID, setRejID] = useState<string[]>([]);

  const [appliedFor, setAppliedFor] = useState<job[]>([]);
  const [rejected, setRejected] = useState<job[]>([]);
  const [data, setData] = useState<job[]>([]);

  const backup: job[] = useJobs();

  const updateUserDoc = useUpdateUserDoc();
  const userDoc = useUserDoc();

  useEffect(() => {
    if (userDoc?.applied) {
      setAppID(userDoc.applied);
    }

    if (userDoc?.rejected) {
      setRejID(userDoc.rejected);
    }

    setData(backup.filter((x) => !appID.includes(x.job_post_uid)));
  }, [userDoc, appID, backup]);

  const incrementCurrent = useCallback(() => {
    if (current == data.length) {
    } else {
      setCurrent(current + 1);
    }
  }, [current, data, setCurrent]);

  const controls = useAnimationControls();

  const leftDrag = useCallback(() => {
    controls.start({
      x: -1500,
      rotate: 150,
      transition: { duration: 0.5 },
      transitionEnd: {
        x: 0,
        rotate: 0,
        animationDuration: "1.5s",
      },
    });
  }, [controls]);

  const rightDrag = useCallback(() => {
    controls.start({
      rotate: -150,
      x: 1500,
      transition: { duration: 0.5 },
      transitionEnd: {
        rotate: 0,
        x: 0,
        animationDuration: "1.5s",
      },
    });
  }, [controls]);

  const reject = useCallback(() => {
    if (current != data.length) {
      var temp = rejected.slice();
      temp.push(data[current]);
      setRejected(temp);
      updateUserDoc("rejected", [...rejID, data[current].job_post_uid]);
      setRejID([...rejID, data[current].job_post_uid]);
      incrementCurrent();
    }
  }, [current, data, rejected, incrementCurrent, rejID, updateUserDoc]);

  const apply = useCallback(() => {
    if (current != data.length) {
      var temp = appliedFor.slice();
      temp.push(data[current]);
      setAppliedFor(temp);
      updateUserDoc("applied", [...appID, data[current].job_post_uid]);
      setAppID([...appID, data[current].job_post_uid]);
      incrementCurrent();
    }
  }, [current, data, appliedFor, incrementCurrent, appID, updateUserDoc]);

  let keyChecker = (e: KeyboardEvent) => {
    if (e.key == "ArrowLeft") {
      reject();
      leftDrag();
    } else if (e.key == "ArrowRight") {
      apply();
      rightDrag();
    }
  };

  useEffect(() => {
    let keyChecker = (e: KeyboardEvent) => {
      if (e.key == "ArrowLeft") {
        reject();
        leftDrag();
      } else if (e.key == "ArrowRight") {
        apply();
        rightDrag();
      }
    };

    document.addEventListener("keydown", keyChecker, false);

    return () => {
      document.removeEventListener("keydown", keyChecker, false);
    };
  }, [apply, reject, leftDrag, rightDrag]);

  const x = useMotionValue(0);

  const opacityValue = useTransform(x, [-1500, 0, 1500], [0, 1, 0]);

  return (
    <div className="flex flex-row items-center align-middle">
      <div
        className={
          "mr-auto " + (current != data.length ? "visible" : "invisible")
        }
      >
        <div
          onClick={() => {
            reject();
            leftDrag();
          }}
          className="flex flex-row rounded-xl bg-white pl-2 pr-2 pb-2 pt-1 align-middle text-black"
        >
          <ChevronLeft height={20} color="red" />
        </div>
      </div>

      <div style={{ userSelect: "none" }} className="mr-auto ml-auto mt-16">
        <div className="">
          {current != data.length ? (
            <motion.div
              drag={"x"}
              dragSnapToOrigin
              onDragEnd={(event, info) => {
                if (info.point.x > 1300) {
                  apply();
                  rightDrag();
                } else if (info.point.x < 700) {
                  reject();
                  leftDrag();
                }
              }}
              className="rounded-3xl bg-white"
              id="swiper"
              animate={controls}
            >
              <SwipeCard
                info={data[current] as job}
                apply={apply}
                reject={reject}
              />
            </motion.div>
          ) : (
            <SwipeCard apply={apply} reject={reject} />
          )}
        </div>
      </div>

      <div
        className={
          "ml-auto " + (current != data.length ? "visible" : "invisible")
        }
      >
        <div
          onClick={() => {
            apply();
            rightDrag();
          }}
          className="rounded-xl bg-white pl-2 pr-2 pb-2 pt-1 align-middle text-black"
        >
          <ChevronRight height={20} color="green" />
        </div>
      </div>
    </div>
  );
};

export default Swipe;
