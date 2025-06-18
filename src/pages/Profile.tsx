import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/Profile.css';
import { APIURl } from "../services/APIPath";
import Skeleton from "react-loading-skeleton";
import Product from "../elements/product";
import { motion, AnimatePresence } from "motion/react";

interface ProfilePageProps {
  username?: string;
}

interface User {
  id: number;
  display_name
  username: string;
  img_cover: string;
  img_photo: string;
  description: string;
  // agrega otros campos necesarios
}

interface Product {
  id: number;
  name: string;
  description: string;
  isPrincipal: boolean;
  length: number,
  map: Function;
}


function ProfilePage({ username }: ProfilePageProps) {
  const params = useParams<{ id?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Definir el parámetro de búsqueda: prioriza username prop, si no existe usa id de params
  const identifier = username || params.id;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // o 'auto'
    });
    if (!identifier) return;

    setLoading(true);

    // Determinar si es id (número) o username (string)
    // Para simplificar, si es solo dígitos, asumimos id, sino username
    const isId = /^\d+$/.test(identifier);

    // Construir URL
    const url = isId 
      ? `${APIURl}/users/user/${identifier}`
      : `${APIURl}/users/user/byusername/${identifier}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setUser(data[0] || null);  // supongo que devuelve array con un solo usuario
      })
      .catch(() => setUser(null))
      //.finally(() => setLoading(false));
  }, [identifier]);

  useEffect(() => {
    if (!identifier) return;
    if (!user) return;
    fetch(APIURl + '/users/user/' + user.id + '/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    })
    .catch(() => setProducts(null))
  }, [user])


  return (
    <div className="ProfileContainer">
        <motion.div
          className="ProfileCover"
          style={{
            backgroundImage: user && !loading ? `url(${user.img_cover})` : "none",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="ProfileOther">
          <div className="ProfileInfo">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="skeleton-logo"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="ProfileLogo"
                  >
                    <Skeleton className="ProfileLogo" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="user-logo"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="ProfileLogo PLColor"
                    style={{
                      backgroundImage: `url(${user?.img_photo})`,
                    }}
                  />
                )}
              </AnimatePresence>

              <div className="ProfileColumn">
                <AnimatePresence mode="wait">
                  {loading || !user ? (
                    <motion.div
                      key="skeleton-info"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="SkeletonTitles"
                    >
                      <Skeleton className="TitleSkeleton" width="50%" height={40} />
                      <Skeleton className="TitleSkeleton" width={100} height={15} />
                      <Skeleton className="TitleSkeleton" width="100%" height="100%" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="user-info"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h1>{user.display_name}</h1>
                      <p style={{color: 'var(--secondary-text-color)'}}>@{user.username}</p>
                      <p>{user.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="ProfileProducts">
              {!loading && products?.length ? (
                <>
                  <motion.div
                    variants={{
                      hidden: {height: "0px", opacity: 0, y: 50, filter: 'blur(10px)'},
                      visible: {height: "auto", opacity: 1, y: 0, filter: 'blur(0px)'},
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,     // qué tan duro es el resorte
                      damping: 17,        // qué tan rápido se detiene (menos = más rebote)
                      bounce: 0.5,        // rebote adicional
                      delay: 0.6
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <h2>Products</h2>
                    <div className="ProductList">{products.map((producto, i) => (
                      <Product
                        ProductElement={producto}
                        styles={{ marginLeft: i > 0 ? '10px' : 0 }}
                        key={i}
                      />
                    ))}
                    </div>
                  </motion.div>
                </>
              ) : null}

            </div>
        </div>
    </div>
  );
}

export default ProfilePage;
