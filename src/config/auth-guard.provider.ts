import { APP_GUARD } from '../const/auth.const';
import { AuthGuard } from '../auth/auth.guard';

export const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
