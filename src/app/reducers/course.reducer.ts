import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CourseModel, AppStore } from '../shared/';
import * as courseActions from './course.actions';

export interface CourseState extends EntityState<CourseModel> {
  // additional entities state properties
  selectedCourseId: string | null
};
export const courseAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();
export const initialCourseState: CourseState = courseAdapter.getInitialState({
  ids: ['1', '2'],
  entities: {
    '1': {
      id: '1',
      name: 'Deep JavaScript Foundations',
      instructorId: '1',
      description: `Join Kyle Simpson -- author of the popular \"You Don’t Know JavaScript\" book series -- as he reveals the deep foundations of JavaScript. You'll learn about object wrappers, coercion, scope, closure, types, prototype system, ES6 features, == vs === and more. Understand deeply how the JavaScript engine looks for variables in function and block scope (var, let and const). Learn which ES6 features can help or hurt your coding and which new features should be used with caution. Also why coercion is one of the overlooked keys to using JavaScript more effectively. With this course, you'll see how gaining a deeper understanding of JavaScript will make you a better communicator and programmer!`
    },
    '2': {
      id: '2',
      name: 'ES6: The Right Parts',
      instructorId: '1',
      description: `Get comfortable with the latest evolutions of this great JavaScript language. By coding along with Kyle in this course you will learn: To use ‘let’ and ‘const’, Destructuring, template literals, Iterators and generators. Plus learn arrow functions, default parameters, rest and spread operators, computed and concise properties and methods. Learn to use these new ES6 JavaScript language features to write cleaner, more productive, and more readable programs!`
    }
  },
  selectedCourseId: null
});

export function courseReducer(state: CourseState = initialCourseState,
  action: courseActions.CourseActions) {
  switch (action.type) {
    case courseActions.ADD_COURSE:
      return {
        ...courseAdapter.addOne(action.payload, state),
        selectedCourseId: null
      };
    case courseActions.DELETE_COURSE:
      return {
        ...courseAdapter.removeOne(action.payload.id, state),
        selectedCourseId: (action.payload.id != state.selectedCourseId) ? state.selectedCourseId : null
      }
    case courseActions.UPDATE_COURSE:
      const { id = '', name = '', description = '', instructorId = '' } = action.payload || {};
      const changes = { name, description, instructorId };
      const newState: CourseState = courseAdapter.updateOne({ id, changes }, state);
      return {
        ...newState,
        selectedCourseId: null
      };
    case courseActions.SELECT_COURSE:
      return {
        ...state,
        selectedCourseId: action.payload.id
      };
    case courseActions.DELETE_COURSES_By_INSTRUCTOR:
      const courseIds = Object.keys(state.entities)
        .filter(id => state.entities[id].instructorId === action.payload.instructorId)
        .map(id => state.entities[id].id)
      console.log('courseIds', courseIds);
      return {
        ...courseAdapter.removeMany(courseIds, state),
        selectedCourseId: courseIds.indexOf(state.selectedCourseId) < 0 ? state.selectedCourseId : null
      }
    default:
      return state;
  }
}
