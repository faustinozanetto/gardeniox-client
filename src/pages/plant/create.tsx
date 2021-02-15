import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Flex,
  Box,
  Text,
  Stack,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { FormField } from '../../components/forms/FormField';
import { PlantType, useCreatePlantMutation } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { AppLayout } from '../../layout/AppLayout';
import { withApollo } from '../../utils/apollo/withApollo';

{
  /* @ts-ignore  */
}
function validateField(value: any) {
  let error;
  if (!value) {
    error = 'Field is required';
  }
  return error;
}

const CreatePlantPage: React.FC<{}> = ({}) => {
  const toast = useToast();
  const [createPlant] = useCreatePlantMutation();
  return (
    <AppLayout>
      <Formik
        initialValues={{
          name: '',
          scientificName: '',
          variety: '',
          type: '' as PlantType,
          image: '',
          plot: '',
          seedSprouted: '',
          plantedOn: '',
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          const { errors } = await createPlant({
            variables: { input: values },
          });
          if (errors) {
            console.error(errors);
          }
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
              <Form>
                <Text
                  as='h1'
                  bgGradient='linear(to-r, teal.500,green.500)'
                  bgClip='text'
                  fontSize='5xl'
                  fontWeight='extrabold'
                  textAlign='center'
                >
                  Create Plant
                </Text>
                <FormField
                  // validateFieldFn={validateField}
                  id='name'
                  name='name'
                  placeholder='Plant Name'
                  label='Plant Name'
                  type='text'
                />
                <FormField
                  // validateFieldFn={validateField}
                  id='scientificName'
                  name='scientificName'
                  placeholder='Scientific Name'
                  label='Scientific Name'
                  type='text'
                />
                <FormField
                  // validateFieldFn={validateField}
                  id='variety'
                  name='variety'
                  placeholder='Plant Variety'
                  label='Variety'
                  type='text'
                />
                <Field name='type' validate={validateField}>
                  {({ field, form }: any) => (
                    <FormControl id='type'>
                      <FormLabel htmlFor='type'>Plant Type</FormLabel>
                      <Select
                        {...field}
                        id='type'
                        placeholder='Select Plant Type'
                      >
                        {Object.values(PlantType).map((plantType, index) => (
                          <option key={index}>{plantType}</option>
                        ))}
                      </Select>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <FormField
                  // validateFieldFn={validateField}
                  id='image'
                  name='image'
                  placeholder='Plant Image'
                  label='Image'
                  type='text'
                />
                <FormField
                  // validateFieldFn={validateField}
                  id='plot'
                  name='plot'
                  placeholder='Plant Plot ID'
                  label='Plot'
                  type='text'
                />
                <FormField
                  // validateFieldFn={validateField}
                  id='seedSprouted'
                  name='seedSprouted'
                  placeholder='Seed Sprouted On'
                  label='Seed Sprouted'
                  type='text'
                />
                <FormField
                  // validateFieldFn={validateField}
                  id='plantedOn'
                  name='plantedOn'
                  placeholder='Planted to Soil On'
                  label='Planted On'
                  type='text'
                />
                <Stack justify='center' mt={3} isInline spacing={10}>
                  <Button
                    mt={4}
                    minWidth='50%'
                    colorScheme='green'
                    isLoading={isSubmitting}
                    type='submit'
                  >
                    Create
                  </Button>
                </Stack>
              </Form>
            </Box>
          </Flex>
        )}
      </Formik>
    </AppLayout>
  );
};

export default withApollo({ ssr: false })(CreatePlantPage);