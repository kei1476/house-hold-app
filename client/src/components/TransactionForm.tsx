import { Box, Button, ButtonGroup, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { backendAxios } from '../lib/backendAxios'
import { useEffect, useState } from 'react'
import { Category, TransactionType } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionFormSchema, TransactionFormSchemaType } from '../validations';

interface TransactionFormProps {
  currentDay: string;
}

const TransactionForm = ({ currentDay }: TransactionFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,  
    formState: { errors }
  } = useForm<TransactionFormSchemaType>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      type: 'expense',
      date: currentDay,
      amount: 0,
      content: '',
      category: 0,
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

  const onSubmit: SubmitHandler<TransactionFormSchemaType> = (data) => {
    console.log(data)
  }

  const toggleType = (currentType: TransactionType) => {
    setValue('type', currentType);
  }

  return (
    <Box mb={2}>
      <Typography variant="h6" fontWeight={"fontWeightBold"} mb={1}>収支入力</Typography>
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
            defaultValue={currentDay}
            size="small"
            sx={fontsizeCss}
            {...register("date")}
            error={!!errors.date}
          />
          {errors.date?.message && (<Typography color="error" fontSize={12}>{errors.date?.message}</Typography>)}

          <TextField
            select
            label="カテゴリ"
            size="small"
            sx={fontsizeCss}
            {...register("category")}
            error={!!errors.category}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </TextField>
          {errors.category?.message && (<Typography color='error' fontSize={12}>{errors.category?.message}</Typography>)}


          <TextField
            label="金額"
            type="number"
            size="small"
            sx={fontsizeCss}
            {...register("amount")}
            error={!!errors.amount}
          />
          {errors.amount?.message && (<Typography color='error' fontSize={12}>{errors.amount?.message}</Typography>)}

          <TextField
            label="内容"
            multiline
            rows={1}
            size="small"
            sx={fontsizeCss}
            {...register("content")}
            error={!!errors.content}
          />
          {errors.content?.message && (<Typography color='error' fontSize={12}>{errors.content?.message}</Typography>)}

          <Button type="submit" variant="contained" color={currentType === 'expense' ? 'error': 'primary'}>送信</Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default TransactionForm