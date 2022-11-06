import React from 'react';
import { Grid, Input, styled, Text } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { List, useLists, useShareListForm } from '@/features/list';
import { Button, Description, InputError, List as ListComponent, ListItem, TextColorful } from '@/features/common';

export const ListShare: React.FC = () => {
  const { listSelected, editList } = useLists();

  return (
    <>
      <Description subTitle="Here you can control who access to your list.">
        Sharing <TextColorful yellow>{listSelected.name}</TextColorful> with others
      </Description>

      <ListShareForm saveList={editList} list={listSelected} />

      <ListShareUsers list={listSelected} saveList={editList} />
    </>
  );
};

type ListShareFormProps = {
  list: List;
  saveList: (list: List) => Promise<void>;
};

const ListShareForm: React.FC<ListShareFormProps> = ({ list, saveList }) => {
  const { formik } = useShareListForm(list, saveList);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormContainer>
        <Grid xs={8}>
          <div style={{ width: '100%' }}>
            <Input
              bordered
              color="default"
              fullWidth
              name="email"
              onChange={formik.handleChange}
              placeholder="Email"
              required
              rounded
              type="email"
              value={formik.values.email}
            />
            <InputError error={formik.errors.email} touched={formik.touched.email} />
          </div>
        </Grid>
        <Grid>
          <Button type="submit" loading={formik.isSubmitting}>
            Invite
          </Button>
        </Grid>
      </FormContainer>
    </form>
  );
};

type ListShareUsersProps = {
  list: List;
  saveList: (list: List) => Promise<void>;
};

const ListShareUsers: React.FC<ListShareUsersProps> = ({ list, saveList }) => {
  const handleDeleteEmail = (email: string) => {
    const newList = { ...list, sharedWith: list.sharedWith.filter((e) => e !== email) };
    toast.promise(() => saveList(newList), {
      pending: `Deleting ${email}`,
      success: `${email} deleted`,
      error: `Error deleting ${email}, try again`,
    });
  };

  return (
    <ListComponent>
      {list.sharedWith.map((email) => (
        <ListItem
          key={email}
          extra={
            <Button auto color="error" light onClick={() => handleDeleteEmail(email)}>
              Remove
            </Button>
          }
        >
          <Text css={{ m: '$md' }}>{email}</Text>
        </ListItem>
      ))}
    </ListComponent>
  );
};

const FormContainer = styled('div', {
  display: 'flex',
  gap: '$md',
  margin: '$xl 0 $lg',
});
