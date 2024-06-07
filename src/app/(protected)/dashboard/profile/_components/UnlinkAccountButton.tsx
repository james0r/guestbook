import { oAuthRemove } from '@/actions/authActions';
import { SubmitButton } from '@/components/SubmitButton';

export default function UnlinkAccountButton({
  userId,
  provider,
}: {
  userId: string;
  provider: string;
}) {
  const bindUserId = oAuthRemove.bind(null, userId as string);
  const bindProvider = bindUserId.bind(null, provider as string);
  return (
    <form action={bindProvider}>
      <SubmitButton size='sm' variant='destructive' text="Disconnect" />
    </form>
  );
}