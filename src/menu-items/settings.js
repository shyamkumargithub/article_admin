// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const settings = {
  id: 'settings',
  title: 'settings',
  type: 'group',
  children: [
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      url: '/category',
      icon: icons.ChromeOutlined
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.ChromeOutlined
    }
  ]
};

export default settings;
