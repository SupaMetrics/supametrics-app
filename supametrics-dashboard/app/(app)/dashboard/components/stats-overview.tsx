import { motion } from "framer-motion";
import {
  ArrowUpRight,
  // ArrowDownRight,
  Users,
  FileText,
  Folder,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StatsOverview = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[
          {
            title: "Total Visitors",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            value: "8,250",
            subtitle: (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                +9.8% this week
              </p>
            ),
          },
          {
            title: "Reports",
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            value: "18",
            subtitle: (
              <p className="text-xs text-muted-foreground">This week</p>
            ),
          },
          {
            title: "Projects",
            icon: <Folder className="h-4 w-4 text-muted-foreground" />,
            value: "10",
            subtitle: (
              <p className="text-xs text-muted-foreground">All active</p>
            ),
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.subtitle}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
