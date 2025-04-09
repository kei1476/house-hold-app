import { Box, Button, ButtonGroup, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { backendAxios } from '../lib/backendAxios'
import { useEffect, useState } from 'react'
import { Category, Transaction, TransactionType } from '../types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionFormSchema, TransactionFormSchemaType } from '../validations';

interface TransactionFormProps {
  currentDay: string;
  storeTransactions: (transaction: TransactionFormSchemaType) => Promise<void>;
  selectedTransaction: Transaction | null;
}

const TransactionForm = ({ currentDay, storeTransactions, selectedTransaction }: TransactionFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { 
    register, 
    control,
    handleSubmit, 
    watch, 
    setValue,  
    reset,
    formState: { errors }
  } = useForm<TransactionFormSchemaType>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      type: 'expense',
      date: currentDay,
      amount: 0,
      content: '',
      category_id: 0,
    }
  });
  const currentType = watch('type');
  const fontsizeCss = { '& input': { fontSize: 12 }, '& label': { fontSize: 14 } }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await backendAxios.get('category', { params: { type: currentType } });
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (currentType) {
      fetchCategories();
    }
  }, [currentType]);

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  const onSubmit: SubmitHandler<TransactionFormSchemaType> = (data) => {
    storeTransactions(data);
    reset({
      type: 'expense',
      date: currentDay,
      amount: 0,
      content: '',
      category_id: 0
    });
  }
console.log(errors)
  const toggleType = (currentType: TransactionType) => {
    setValue('type', currentType);
  }

  useEffect(() => {
    if(selectedTransaction) {
      setValue('type', selectedTransaction.type)
      setValue('category_id', selectedTransaction.category_id)
      setValue('amount', selectedTransaction.amount)
      if (selectedTransaction?.content !== undefined) {
        setValue('content', selectedTransaction.content, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
      setValue('date', selectedTransaction.date)
    }
  },[selectedTransaction]);

  return (
    <Box mb={2}>
      <Typography variant="h6" fontWeight={"fontWeightBold"}>収支入力</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <input {...register("type", { value: "expense" })} type="hidden" />
          <ButtonGroup fullWidth>
            <Button 
              type='button'
              variant={currentType === 'expense' ? "contained" : 'outlined'} 
              color="error" 
              onClick={() => toggleType('expense')}
            >
              支出
            </Button>
            <Button 
              type='button' 
              variant={currentType === 'income' ? "contained" : 'outlined'} 
              onClick={() => toggleType('income')}
              >
                収入
              </Button>
          </ButtonGroup>
          <TextField
            type="date"
            size="small"
            sx={fontsizeCss}
            {...register("date", {value: currentDay})}
            error={!!errors.date}
          />
          {errors.date?.message && (<Typography color="error" fontSize={12}>{errors.date?.message}</Typography>)}

          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  select
                  label="カテゴリ"
                  size="small"
                  sx={fontsizeCss}
                  error={!!errors.category_id}
                  {...field}
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
                {errors.category_id?.message && (<Typography color='error' fontSize={12}>{errors.category_id?.message}</Typography>)}
              </>
              
            )}
          />

          <TextField
            label="金額"
            type="number"
            size="small"
            sx={fontsizeCss}
            {...register("amount", { valueAsNumber: true })}
            error={!!errors.amount}
          />
          {errors.amount?.message && (<Typography color='error' fontSize={12}>{errors.amount?.message}</Typography>)}

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                label="内容"
                rows={1}
                size="small"
                sx={fontsizeCss}
                error={!!errors.content}
                {...field}
              />
            )}
          />
          {errors.content?.message && (<Typography color='error' fontSize={12}>{errors.content?.message}</Typography>)}

          <Button type="submit" variant="contained" color={currentType === 'expense' ? 'error': 'primary'}>送信</Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default TransactionForm