"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const columns = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export default function KanbanBoard({
  applications,
}: {
  applications: any[];
}) {
  const [items, setItems] =
    useState(applications);

  async function onDragEnd(result: any) {
    if (!result.destination) return;

    const id = result.draggableId;
    const newStatus =
      result.destination.droppableId;

    const updated = items.map((item) =>
      item.id === id
        ? {
            ...item,
            status: newStatus,
          }
        : item
    );

    setItems(updated);

    await fetch(
      "/api/applications/status",
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
          status: newStatus,
        }),
      }
    );
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="grid grid-cols-4 gap-6">
        {columns.map((column) => (
          <Droppable
            key={column}
            droppableId={column}
          >
            {(provided) => (
              <div
                ref={
                  provided.innerRef
                }
                {...provided.droppableProps}
                className="bg-gray-800 rounded-lg p-4 min-h-[500px]"
              >
                <h2 className="font-bold text-lg mb-4">
                  {column}
                </h2>

                {items
                  .filter(
                    (item) =>
                      item.status ===
                      column
                  )
                  .map(
                    (
                      item,
                      index
                    ) => (
                      <Draggable
                        key={item.id}
                        draggableId={
                          item.id
                        }
                        index={index}
                      >
                        {(
                          provided
                        ) => (
                          <div
                            ref={
                              provided.innerRef
                            }
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded shadow p-4 mb-3"
                          >
                            <h3 className="font-semibold">
                              {
                                item.company
                              }
                            </h3>

                            <p className="text-sm text-gray-600">
                              {
                                item.role
                              }
                            </p>

                            <p className="text-xs mt-2">
                              📍{" "}
                              {item.location ||
                                "-"}
                            </p>

                            <p className="text-xs">
                              💰{" "}
                              {item.salary ||
                                "-"}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    )
                  )}

                {
                  provided.placeholder
                }
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}