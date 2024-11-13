import { IUsersState } from '../store/user/reducers';
import { IProductState } from '../store/product/reducers';
import { IActivityState } from '../store/activity/reducers';

export interface IStore {
  user: IUsersState;
  product: IProductState;
  activity: IActivityState;
}
