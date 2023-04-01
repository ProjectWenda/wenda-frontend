import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { getTasksByDay, getTasksByNotDay } from "../../domain/TaskUtils";
import { getWeekdayName } from "../../domain/WeekdayUtils";
import { Weekday } from "../../schema/Weekday";
import { draggingState, userTasksState, weekTasksState } from "../../store";
import IconButton from "../IconButton";
import NewTaskForm from "./NewTaskForm";
import NewTaskPrompt from "./NewTaskPrompt";
import TaskItem from "./TaskItem";

interface DayOfWeekListProps {
  dayOfWeek: Weekday;
  uid: string;
}

const DayOfWeekList: React.FC<DayOfWeekListProps> = ({ dayOfWeek, uid }) => {
  const [addingNewTask, setAddingNewTask] = React.useState(false);
  const weekTasks = useRecoilValue(weekTasksState);
  const dragging = useRecoilValue(draggingState);
  const dayTasks = getTasksByDay(weekTasks, dayOfWeek);
  const isToday = moment().day() === dayOfWeek;
  const contClassName = `group w-full mr-1 first:ml-1 last:border-r-0 dark:border-x-neutral-500 bg-gray-200 dark:bg-zinc-700 ${
    isToday && "border-t-4 border-t-disc-blue"
  }`;

  return (
    <Droppable droppableId={getWeekdayName(dayOfWeek)} type="COLUMN">
      {(droppableProvided: DroppableProvided) => (
        <div
          className={contClassName}
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          <div
            className={`flex justify-between items-center bg-zinc-300 dark:bg-disc-dark-4 p-1 ${
              !isToday && "pt-2"
            }`}
          >
            <h2 className="text-lg ml-1 font-bold">
              {getWeekdayName(dayOfWeek)}
            </h2>
            <div className="flex gap-3 mr-1">
              <IconButton
                icon={faCirclePlus}
                size="sm"
                disabled={addingNewTask}
                onClick={
                  !addingNewTask ? () => setAddingNewTask(true) : undefined
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-1 p-1">
            {dayTasks.map((t, index) => (
              <TaskItem task={t} index={index} uid={uid} key={t.taskID} />
            ))}
          </div>
          {addingNewTask ? (
            <NewTaskForm
              setAddingNewTask={setAddingNewTask}
              dayOfWeek={dayOfWeek}
              uid={uid}
            />
          ) : !dragging ? (
            <NewTaskPrompt
              className="group-hover:visible invisible group-hover:animate-in group-hover:duration-300 group-hover:fade-in"
              setAddingNewTask={setAddingNewTask}
            />
          ) : null}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DayOfWeekList;
