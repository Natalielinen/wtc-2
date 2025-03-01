import { useEffect } from "react"; // Импорт Firebase
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useUserStore } from "@/app/stores/userStore";
import { auth, db } from "@/app/constants/firebaseConfig";
// Твой Zustand store

const useAuthListener = () => {
    const setUser = useUserStore((state) => state.setCurrentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {

                const userRef = doc(db, "user", firebaseUser.uid);

                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();

                // Получаем userItems из Firestore
                const itemsRef = collection(db, "item");
                const q = query(itemsRef, where("userId", "==", firebaseUser.uid));
                const itemsSnap = await getDocs(q);

                const userItems = itemsSnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Устанавливаем пользователя в Zustand
                setUser({
                    id: userData?.uid,
                    userName: userData?.displayName,
                    userEmail: userData?.email || "",
                    userPassword: "", // Лучше не хранить пароль
                    userItems,
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Очищаем подписку при размонтировании
    }, [setUser]);
};

export default useAuthListener;
