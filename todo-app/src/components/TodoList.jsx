import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';

export default function TodoList({ tasks, onToggle, onDelete, onReorder }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400 dark:text-gray-600 text-sm animate-fadeIn">
                <svg className="w-14 h-14 mx-auto mb-3 text-gray-200 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                No tasks yet. Add one above!
            </div>
        );
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        if (result.source.index === result.destination.index) return;
        onReorder(result.source.index, result.destination.index);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todo-list">
                {(provided) => (
                    <ul
                        className="flex flex-col gap-2"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                {(provided, snapshot) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={provided.draggableProps.style}
                                        className={`animate-slideUp ${snapshot.isDragging ? 'z-50' : ''}`}
                                    >
                                        <TodoItem
                                            task={task}
                                            onToggle={onToggle}
                                            onDelete={onDelete}
                                            dragHandleProps={provided.dragHandleProps}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}
