import Loader from "@/components/widgets/Loader";
import { useFetcher } from "@/lib/api";

type LoginType = {
  user: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
};

const LoginFailureTable = () => {
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
  } = useFetcher("/user-fail-login");
  return (
    <div className="bg-white rounded-xl shadow-sm mx-6 p-4">
      <h2 className="text-lg font-semibold mb-4 mt-2">Login Failures</h2>
      {loginLoading && <Loader />}
      {!loginLoading && !loginError && loginData && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b bg-gray-50">
                <th className="p-2">Username</th>
                <th className="p-2">Jan</th>
                <th className="p-2">Feb</th>
                <th className="p-2">Mar</th>
                <th className="p-2">Apr</th>
                <th className="p-2">May</th>
              </tr>
            </thead>
            <tbody>
              {loginData.message.map((entry: LoginType, idx: number) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{entry.user}</td>
                  <td className="p-2">{entry.jan}</td>
                  <td className="p-2">{entry.feb}</td>
                  <td className="p-2">{entry.mar}</td>
                  <td className="p-2">{entry.apr}</td>
                  <td className="p-2">{entry.may}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoginFailureTable;
