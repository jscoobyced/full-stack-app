export type LanguageContent = {
  Title: string,
  Home: string,
  Copyright: string,
  CaloriesCalculator: string,
  SignIn: string,
  SignOut: string,
  CaloriesCalculatorIntro: string;
  Ingredient: string;
  Unit: string;
  Quantity: string;
  Save: string;
  Add: string;
  Remove: string;
  Select: string;
  SavedRecipes: string;
  Calories: string;
  Total: string;
  Saving: string;
  SavedSuccessfully: string;
  SavedFailed: string;
  SavingNotAllowed: string;
};

export const English: LanguageContent = {
  Title: 'Pheung & Céd homepage',
  Home: 'Home',
  Copyright: 'Copyright',
  CaloriesCalculator: 'Calories Calculator',
  SignIn: 'Sign In',
  SignOut: 'Sign Out',
  CaloriesCalculatorIntro: 'This is the calories calculator. Add the ingredients and quantity or volume and it will show you the resulting number of calories per overall volume.',
  Ingredient: 'Ingredient',
  Unit: 'Unit',
  Quantity: 'Quantity',
  Save: 'Save',
  Add: 'Add',
  Select: 'Select',
  SavedRecipes: 'Saved recipes',
  Calories: 'Calories',
  Remove: 'Remove',
  Total: 'Total',
  Saving: 'Saving...',
  SavedSuccessfully: 'Saved successfully.',
  SavedFailed: 'Saving failed.',
  SavingNotAllowed: 'You are not allowed to save the recipe. Please sign-in and contact the site administrator to enable your account.',
};

export const French: LanguageContent = {
  Title: 'Le site de Pheung & Céd',
  Home: 'Acceuil',
  CaloriesCalculator: 'Calculateur de calories',
  Copyright: 'Droits d\'auteurs',
  SignIn: 'Se Connecter',
  SignOut: 'Se Déconnecter',
  CaloriesCalculatorIntro: 'Voici le calculateur de calories. Ajoutez les ingrédients et la quantité ou volume '
    + 'désiré et cela vous donnera le résultat total de calories pour cette recette.',
  Ingredient: 'Ingrédient',
  Unit: 'Unité',
  Quantity: 'Quantité',
  Save: 'Enregistrer',
  Add: 'Ajouter',
  Select: 'Selectionner',
  SavedRecipes: 'Recettes enregistrées',
  Calories: 'Calories',
  Remove: 'Retirer',
  Total: 'Total',
  Saving: 'Enregistrement end cours...',
  SavedSuccessfully: 'Enregistrement completé.',
  SavedFailed: 'L\'enregistrement a echoué.',
  SavingNotAllowed: 'Vous n\'êtes pas autorisé à enregister des recettes. Veuillez vous connecter' +
    ' et contactez l\'administrateur du site pour vous autoriser.',
};

export const Thai: LanguageContent = {
  Title: 'เว็บไซต์ของ Pheung & Céd',
  Home: 'หน้าแรก',
  Copyright: 'ลิขสิทธิ์',
  CaloriesCalculator: 'เครื่องคำนวณแคลอรี่',
  SignIn: 'เข้าสู่ระบบ',
  SignOut: 'ออกจากระบบ',
  CaloriesCalculatorIntro: 'นี่คือเครื่องคำนวณแคลอรี่ เพิ่มส่วนผสมและปริมาณหรือปริมาตรและจะแสดงจำนวนแคลอรี่ที่เกิดขึ้นต่อปริมาตรโดยรวม',
  Ingredient: 'ส่วนผสม',
  Unit: 'หน่วย',
  Quantity: 'ปริมาณ',
  Save: 'บันทึก',
  Add: 'เพิ่ม',
  Select: 'เลือก',
  SavedRecipes: 'สูตรที่บันทึกไว้',
  Calories: 'แคลอรี่',
  Remove: 'ลบ',
  Total: 'รวม',
  Saving: 'กำลังบันทึก...',
  SavedSuccessfully: 'บันทึกเรียบร้อยแล้ว.',
  SavedFailed: 'การบันทึกล้มเหลว.',
  SavingNotAllowed: 'คุณไม่ได้รับอนุญาตให้บันทึกสูตร โปรดลงชื่อเข้าใช้และติดต่อผู้ดูแลเว็บไซต์เพื่อเปิดใช้งานบัญชีของคุณ.',
};
