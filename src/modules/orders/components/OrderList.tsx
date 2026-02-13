"use client";
import {
  CircularProgress,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { format } from "date-fns";
import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { IOrderWithDetails } from "../interfaces/orders-with-details";
import { OrderCard } from "./OrderCard";
import { getLocalTimeZone, parseDate } from "@internationalized/date";

export const OrderList = () => {
  const today = parseDate(new Date().toISOString().split("T")[0]);
  const [dateRange, setDateRange] =
    React.useState<RangeValue<DateValue> | null>({
      start: today,
      end: today,
    });

  // Build URL with query parameters
  const buildUrl = () => {
    const params = new URLSearchParams();
    if (dateRange?.start) {
      params.append(
        "startDate",
        format(dateRange.start.toDate(getLocalTimeZone()), "yyyy-MM-dd"),
      );
    }
    if (dateRange?.end) {
      params.append(
        "endDate",
        format(dateRange.end.toDate(getLocalTimeZone()), "yyyy-MM-dd"),
      );
    }
    return `/api/orders?${params.toString()}`;
  };

  const url = buildUrl();
  console.log({ url });

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error("Error fetching orders");
      return res.json();
    });

  const { data, error, isLoading } = useSWR<IOrderWithDetails[]>(url, fetcher, {
    refreshInterval: 500,
    revalidateOnFocus: false,
  });
  console.log({ data });

  // Update URL when dates change
  useEffect(() => {
    mutate(url);
  }, [dateRange]);

  if (isLoading) {
    return (
      <section className="min-h[80vh] flex flex-col justify-center items-center">
        <CircularProgress
          aria-label="progress indicador"
          color="primary"
          size="lg"
        />
      </section>
    );
  }

  if (error) {
    // console.log(error);
    return (
      <section className="min-h[80vh] flex flex-col justify-center items-center">
        <p>Ocurrio un error</p>
      </section>
    );
  }

  // COnvertir las fechas a objeros Date
  const orders = data!.map((order: IOrderWithDetails) => ({
    ...order,
    status: Boolean(order.status),
    createdAt: new Date(order.createdAt),
    updatedAt: new Date(order.updatedAt),
  }));

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Filtros de búsqueda
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selecciona un rango de fechas para filtrar las órdenes
            </p>
          </div>

          <div className="flex-1 max-w-2xl">
            <DateRangePicker
              label="Rango de fechas"
              className="w-full"
              classNames={{
                base: "w-full",
                label: "text-foreground/80 dark:text-foreground/80 font-medium",
                input: "text-foreground/90 dark:text-foreground/90",
                inputWrapper:
                  "border border-gray-200 dark:border-gray-700 hover:border-primary",
                popoverContent: "dark:bg-gray-800",
              }}
              value={dateRange}
              onChange={setDateRange}
              visibleMonths={2}
              pageBehavior="single"
              variant="bordered"
              size="lg"
              showMonthAndYearPickers
              calendarProps={{
                classNames: {
                  content: "dark:bg-gray-800",
                  header: "dark:bg-gray-800",
                  title: "dark:text-white",
                  nextButton: "dark:text-white",
                  prevButton: "dark:text-white",
                },
              }}
            />
          </div>

          {dateRange && (dateRange.start || dateRange.end) && (
            <button
              onClick={() => setDateRange(null)}
              className="px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Encabezado y contador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Historial de Órdenes
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {orders?.length || "No"}{" "}
            {orders?.length === 1 ? "orden encontrada" : "órdenes encontradas"}
          </p>
        </div>
      </div>

      {/* Lista de órdenes */}
      {orders && orders.length > 0 ? (
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No hay órdenes
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No se encontraron órdenes en el rango de fechas seleccionado.
          </p>
        </div>
      )}
    </section>
  );
};
