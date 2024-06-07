import { oAuthLogin } from '@/actions/authActions';
import { SubmitButton } from '@/components/SubmitButton';

export default function LinkAccountButton({ provider }: { provider: string }) {
  // const [state, submitAction, isPending] = useActionState(deleteAccount, initialState);
  const action = oAuthLogin.bind(null, provider as string);

  return (
    <form action={action}>
      <SubmitButton size='sm' variant='outline' text="Connect" />
    </form>
  );
}