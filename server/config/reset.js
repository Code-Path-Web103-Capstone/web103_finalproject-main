import supabase from '../config/supabase.js';

const deleteUserRows = async () => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .neq('id', 0); // This ensures all rows are deleted

  if (error) {
    console.error('Error deleting user rows:', error);
  } else {
    console.log('User rows deleted successfully:', data);
  }
};

const deletedata

deleteUserRows();