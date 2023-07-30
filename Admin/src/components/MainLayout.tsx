import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { BiBookAdd } from "react-icons/bi";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { useNavigate, Outlet, Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        breakpoint="xl"
        collapsible
        collapsed={collapsed}
        className={`${
          collapsed
            ? "!min-w-[80px] !max-w-[80px] !w-[80px]"
            : "!min-w-[250px] !max-w-[250px] !w-[250px]"
        }`}
      >
        <div className="h-16 bg-yellow-500 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white">
            {collapsed ? "TC" : "ThanhCorn"}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
              return "1";
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard size={24} />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser size={24} />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart size={24} />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart size={20} />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart size={20} />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder size={20} />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder size={20} />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt size={20} />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt size={20} />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors size={20} />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors size={20} />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList size={24} />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <FaBloggerB size={24} />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <BiBookAdd size={24} />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB size={24} />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <BiBookAdd size={24} />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB size={24} />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList size={24} />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <div className="flex justify-between bg-white items-center">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "14px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <div className="mr-4 flex items-center gap-5">
            <div className="relative ">
              <IoIosNotifications size={35} />
              <span className="absolute top-[-6px] right-[-2px] bg-yellow-300 rounded-full h-5 w-5 text-center">
                3
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <img
                  src="https://pbs.twimg.com/profile_images/1534202050304614402/CCmKYCSS_400x400.jpg"
                  alt="user"
                  className="rounded-lg w-10 h-10"
                />
              </div>
              <div className="relative" onClick={toggleMenu}>
                <h3 className="text-lg font-semibold">Ngo Nguyen Ngoc Thanh</h3>
                <p className="text-gray-400 font-normal">
                  adminhahah@gmail.com
                </p>
                {showMenu && (
                  <div className="absolute z-10 top-full right-0 w-full mt-2 py-2 bg-white rounded-lg shadow-lg">
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>

                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Signout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
