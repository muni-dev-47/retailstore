import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

const Card = ({ children }) => (
  <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', padding: '16px' }}>{children}</div>
);
const CardContent = ({ children }) => <div>{children}</div>;

const Dashboard = () => {
  const bills = useSelector(store => store.bill.salesStatements);
  const stacks = useSelector((state) => state.stack.stacks);

  const dailySales = bills?.reduce((acc, curr) => {
    const date = curr.date;
    const total = curr.bill.reduce(
      (sum, item) => sum + parseFloat(item.itemPrice) * parseInt(item.itemCount),
      0
    );
    acc[date] = (acc[date] || 0) + total;
    return acc;
  }, {}) || {};

  const revenueData = Object.entries(dailySales).map(([date, total]) => ({ date, current: total }));

  const stackDateMap = {};
  stacks?.forEach(entry => {
    const date = entry.section.date.split("T")[0];
    const totalCount = entry.section.stacks.reduce((sum, item) => sum + item.itemCount, 0);
    stackDateMap[date] = (stackDateMap[date] || 0) + totalCount;
  });
  const stackChartData = Object.entries(stackDateMap).map(([date, totalStacks]) => ({ date, totalStacks }));

  return (
    <div style={{ padding: '16px', display: 'grid', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <Card>
          <CardContent>
            <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Total Revenue</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>${revenueData.reduce((sum, d) => sum + d.current, 0).toFixed(2)}</p>
            <p style={{ fontSize: '12px', color: 'red' }}>Calculated from sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Total Orders</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{bills?.length || 0}</p>
            <p style={{ fontSize: '12px', color: 'green' }}>All Time Orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Daily Revenue from Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#8884d8" name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Total Stack Quantity Per Date</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stackChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalStacks" fill="#82ca9d" name="Total Stack Quantity" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
